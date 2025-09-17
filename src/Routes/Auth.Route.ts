/**
 * @openapi
 * /api/pasien:
 * get:
 * tags: [Pasien]
 * summary: List pasien
 * responses:
 * 200:
 * description: Daftar pasien
 * post:
 * tags: [Pasien]
 * summary: Tambah pasien
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Pasien'
 * responses:
 * 200:
 * description: Pasien dibuat
 */
