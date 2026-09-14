import re

with open('src/pages/RegisterPage.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update form state
code = code.replace(
    'city: "",\\n  });',
    'city: "",\\n    monthlyAvg: "",\\n  });'
)

# 2. Update payload
payload_pattern = r'await api\.post\("/api/client/auth/register", \\{\\n\\s*company_name: form\\.companyName,\\n\\s*email: form\\.email,\\n\\s*password: form\\.password,\\n\\s*commercial_registration: form\\.commercialReg,\\n\\s*tax_registration: form\\.taxReg,\\n\\s*contact_name: form\\.contactName,\\n\\s*contact_phone: form\\.phone\\n\\s*\\}\\);'
replacement = \"\"\"await api.post("/api/client/auth/register", {
        company_name: form.companyName,
        email: form.email,
        password: form.password,
        commercial_registration: form.commercialReg,
        tax_registration: form.taxReg,
        contact_name: form.contactName,
        contact_phone: form.phone,
        monthly_average_order_amount: form.monthlyAvg ? parseFloat(form.monthlyAvg) : undefined
      });\"\"\"

if not re.search(r'monthly_average_order_amount', code):
    code = re.sub(payload_pattern, replacement, code)

# 3. Add input
input_block = \"\"\"</div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>O U,U.O U,O O U,OU,O OUS O U,OU,U^U,O O (OOOUSOOUS)</label>
                <input type="number" step="0.01" min="0" value={form.monthlyAvg} onChange={set("monthlyAvg")} placeholder="U.OOU, 50000" className={inputClass} style={inputStyle} />
              </div>\"\"\"

if 'monthlyAvg' in input_block:
    code = code.replace(
        '</select>\\n              </div>',
        '</select>\\n              </div>\\n              ' + input_block
    )

with open('src/pages/RegisterPage.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
