import { describe, it, expect, beforeEach } from "vitest"

type Maison = {
  name: string
  cid: string
  registered: boolean
  rejected: boolean
  updatedAt: number
}

const blockHeight = () => 1234

const mockContract = {
  admin: "ST1ADMIN...",
  maisons: new Map<string, Maison>(),

  isAdmin(caller: string) {
    return caller === this.admin
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },

  registerMaison(caller: string, name: string, cid: string) {
    if (this.maisons.has(caller)) return { error: 101 }
    this.maisons.set(caller, {
      name,
      cid,
      registered: true,
      rejected: false,
      updatedAt: blockHeight(),
    })
    return { value: true }
  },

  updateMaison(caller: string, name: string, cid: string) {
    const maison = this.maisons.get(caller)
    if (!maison) return { error: 102 }
    if (maison.rejected) return { error: 103 }
    this.maisons.set(caller, {
      name,
      cid,
      registered: true,
      rejected: false,
      updatedAt: blockHeight(),
    })
    return { value: true }
  },

  rejectMaison(caller: string, maison: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    const data = this.maisons.get(maison)
    if (!data) return { error: 102 }
    this.maisons.set(maison, {
      ...data,
      registered: false,
      rejected: true,
      updatedAt: blockHeight(),
    })
    return { value: true }
  },

  isRegistered(account: string) {
    const m = this.maisons.get(account)
    return { value: m?.registered ?? false }
  },

  isRejected(account: string) {
    const m = this.maisons.get(account)
    return { value: m?.rejected ?? false }
  },

  getMaison(account: string) {
    const m = this.maisons.get(account)
    return m ? { value: m } : { error: 102 }
  },
}

describe("Maison Registry", () => {
  const user1 = "ST2USER..."
  const admin = "ST1ADMIN..."

  beforeEach(() => {
    mockContract.admin = admin
    mockContract.maisons = new Map()
  })

  it("should allow new maison registration", () => {
    const result = mockContract.registerMaison(user1, "Maison d’Avant", "Qm123abc")
    expect(result).toEqual({ value: true })
    const maison = mockContract.maisons.get(user1)
    expect(maison?.name).toBe("Maison d’Avant")
    expect(maison?.registered).toBe(true)
  })

  it("should reject duplicate registration", () => {
    mockContract.registerMaison(user1, "Maison X", "CID")
    const result = mockContract.registerMaison(user1, "Maison Y", "CID")
    expect(result).toEqual({ error: 101 })
  })

  it("should allow admin to reject a maison", () => {
    mockContract.registerMaison(user1, "Maison X", "CID")
    const result = mockContract.rejectMaison(admin, user1)
    expect(result).toEqual({ value: true })
    const status = mockContract.isRejected(user1)
    expect(status).toEqual({ value: true })
  })

  it("should prevent rejected maison from updating", () => {
    mockContract.registerMaison(user1, "Maison X", "CID")
    mockContract.rejectMaison(admin, user1)
    const result = mockContract.updateMaison(user1, "Maison Z", "CIDNEW")
    expect(result).toEqual({ error: 103 })
  })

  it("should allow maison update before rejection", () => {
    mockContract.registerMaison(user1, "Maison X", "CID")
    const result = mockContract.updateMaison(user1, "Maison Y", "CID2")
    expect(result).toEqual({ value: true })
    const m = mockContract.maisons.get(user1)
    expect(m?.name).toBe("Maison Y")
  })

  it("should only allow admin to transfer admin rights", () => {
    const result = mockContract.transferAdmin(user1, "ST3NEWADMIN")
    expect(result).toEqual({ error: 100 })
    const result2 = mockContract.transferAdmin(admin, "ST3NEWADMIN")
    expect(result2).toEqual({ value: true })
    expect(mockContract.admin).toBe("ST3NEWADMIN")
  })
})
