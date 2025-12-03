'use client'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Apakah saya harus menjadi anggota untuk menghadiri ibadah?',
      answer: 'Tidak, ibadah kami terbuka untuk siapa saja. Anda dapat menghadiri ibadah tanpa harus menjadi anggota terlebih dahulu.'
    },
    {
      question: 'Bagaimana cara mendaftar baptisan?',
      answer: 'Anda dapat mendaftar baptisan melalui formulir pelayanan di website atau menghubungi kantor gereja. Biasanya ada kelas persiapan baptisan yang harus diikuti terlebih dahulu.'
    },
    {
      question: 'Apakah ada program untuk anak-anak?',
      answer: 'Ya, kami memiliki Sekolah Minggu untuk anak-anak yang diadakan setiap hari Minggu bersamaan dengan kebaktian umum.'
    },
    {
      question: 'Bagaimana cara bergabung dengan pelayanan?',
      answer: 'Setelah menjadi anggota dan mengikuti kelas orientasi, Anda dapat mendaftar untuk bergabung dengan berbagai pelayanan yang tersedia sesuai dengan karunia dan minat Anda.'
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow">
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
