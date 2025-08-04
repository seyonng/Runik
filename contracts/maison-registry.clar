;; Runik Maison Registry Contract
;; Clarity v2

(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ALREADY-REGISTERED u101)
(define-constant ERR-NOT-REGISTERED u102)
(define-constant ERR-REJECTED u103)
(define-constant ERR-INVALID-UPDATE u104)

(define-data-var admin principal tx-sender)

(define-map maisons
  principal
  {
    name: (string-ascii 48),
    cid: (string-ascii 100),
    registered: bool,
    rejected: bool,
    updated-at: uint
  }
)

(define-private (is-admin)
  (is-eq tx-sender (var-get admin))
)

(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)
  )
)

(define-public (register-maison (name (string-ascii 48)) (cid (string-ascii 100)))
  (let ((existing (map-get? maisons tx-sender)))
    (match existing
      some existing-maison
        (err ERR-ALREADY-REGISTERED)
      none
        (begin
          (map-set maisons tx-sender {
            name: name,
            cid: cid,
            registered: true,
            rejected: false,
            updated-at: block-height
          })
          (ok true)
        )
    )
  )
)

(define-public (update-maison (new-name (string-ascii 48)) (new-cid (string-ascii 100)))
  (let ((maybe-maison (map-get? maisons tx-sender)))
    (match maybe-maison
      some maison
        (begin
          (asserts! (not (get rejected maison)) (err ERR-REJECTED))
          (map-set maisons tx-sender {
            name: new-name,
            cid: new-cid,
            registered: true,
            rejected: false,
            updated-at: block-height
          })
          (ok true)
        )
      none
        (err ERR-NOT-REGISTERED)
    )
  )
)

(define-public (reject-maison (maison principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (let ((maybe-maison (map-get? maisons maison)))
      (match maybe-maison
        some m
          (begin
            (map-set maisons maison {
              name: (get name m),
              cid: (get cid m),
              registered: false,
              rejected: true,
              updated-at: block-height
            })
            (ok true)
          )
        none
          (err ERR-NOT-REGISTERED)
      )
    )
  )
)

(define-read-only (get-maison (account principal))
  (match (map-get? maisons account)
    some data (ok data)
    none (err ERR-NOT-REGISTERED)
  )
)

(define-read-only (is-registered (account principal))
  (match (map-get? maisons account)
    some m (ok (get registered m))
    none (ok false)
  )
)

(define-read-only (is-rejected (account principal))
  (match (map-get? maisons account)
    some m (ok (get rejected m))
    none (ok false)
  )
)

(define-read-only (get-admin)
  (ok (var-get admin))
)
