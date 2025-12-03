export default function Articles() {
  const articles = [
    { 
      title: 'Mengapa Doa Itu Penting?', 
      excerpt: 'Doa adalah nafas kehidupan rohani kita. Melalui doa, kita berkomunikasi dengan Tuhan...', 
      date: '1 Des 2024',
      author: 'Pdt. John Doe'
    },
    { 
      title: 'Hidup dalam Kasih Kristus', 
      excerpt: 'Kasih Kristus mengubah hidup kita dan membuat kita mampu mengasihi sesama...', 
      date: '28 Nov 2024',
      author: 'Pdt. Jane Smith'
    },
    { 
      title: 'Pentingnya Persekutuan', 
      excerpt: 'Kita tidak diciptakan untuk hidup sendiri. Persekutuan dengan sesama orang percaya...', 
      date: '25 Nov 2024',
      author: 'Pdt. John Doe'
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Artikel & Renungan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.author}</span>
                  <button className="text-primary font-semibold hover:underline">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
