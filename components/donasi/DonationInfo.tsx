export default function DonationInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Tentang Persembahan</h2>
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-700 mb-4">
              &quot;Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada persediaan makanan di rumah-Ku dan ujilah Aku, firman TUHAN semesta alam, apakah Aku tidak membukakan bagimu tingkap-tingkap langit dan mencurahkan berkat kepadamu sampai berkelimpahan.&quot;
            </p>
            <p className="text-sm text-gray-500 mb-6">- Maleakhi 3:10</p>

            <h3 className="text-xl font-bold mb-3">Kategori Persembahan:</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Persepuluhan:</strong> 10% dari penghasilan sebagai ucapan syukur kepada Tuhan</li>
              <li><strong>Persembahan:</strong> Persembahan sukarela untuk pelayanan gereja</li>
              <li><strong>Misi:</strong> Dukungan untuk pekerjaan misi dan penginjilan</li>
              <li><strong>Pembangunan:</strong> Dana untuk pembangunan dan renovasi gedung gereja</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
