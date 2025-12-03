import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../format'

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format numbers as Indonesian Rupiah', () => {
      const result1 = formatCurrency(1000)
      const result2 = formatCurrency(1000000)
      const result3 = formatCurrency(50000)
      
      expect(result1).toContain('Rp')
      expect(result1).toContain('1.000')
      expect(result2).toContain('1.000.000')
      expect(result3).toContain('50.000')
    })

    it('should handle zero', () => {
      const result = formatCurrency(0)
      expect(result).toContain('Rp')
      expect(result).toContain('0')
    })

    it('should handle large numbers', () => {
      const result = formatCurrency(1000000000)
      expect(result).toContain('Rp')
      expect(result).toContain('1.000.000.000')
    })
  })
})
