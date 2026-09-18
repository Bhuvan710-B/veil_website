import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export interface EarlyAccessRecord {
  id: string
  email: string
  plan?: string
  source?: string
  createdAt: string
  userAgent?: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  company: string
  agentsCount?: string
  useCase?: string
  createdAt: string
}

export function saveEarlyAccess(email: string, plan = "General", userAgent?: string): { success: boolean; position: number; alreadyExists: boolean } {
  ensureDataDir()
  const filePath = path.join(DATA_DIR, "early-access.json")
  let records: EarlyAccessRecord[] = []

  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8")
      records = JSON.parse(data)
    } catch {
      records = []
    }
  }

  const existing = records.find((r) => r.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    const position = records.findIndex((r) => r.email.toLowerCase() === email.toLowerCase()) + 1
    return { success: true, position, alreadyExists: true }
  }

  const newRecord: EarlyAccessRecord = {
    id: `ea_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: email.toLowerCase().trim(),
    plan,
    createdAt: new Date().toISOString(),
    userAgent,
  }

  records.push(newRecord)
  fs.writeFileSync(filePath, JSON.stringify(records, null, 2), "utf-8")

  return { success: true, position: records.length, alreadyExists: false }
}

export function saveContactInquiry(inquiry: Omit<ContactInquiry, "id" | "createdAt">): { success: boolean; id: string } {
  ensureDataDir()
  const filePath = path.join(DATA_DIR, "contact-inquiries.json")
  let inquiries: ContactInquiry[] = []

  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8")
      inquiries = JSON.parse(data)
    } catch {
      inquiries = []
    }
  }

  const newInquiry: ContactInquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...inquiry,
    createdAt: new Date().toISOString(),
  }

  inquiries.push(newInquiry)
  fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), "utf-8")

  return { success: true, id: newInquiry.id }
}
