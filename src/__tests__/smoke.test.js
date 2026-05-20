import { describe, it, expect } from 'vitest'

describe('Entorno de test', () => {
  it('el entorno Vitest funciona correctamente', () => {
    expect(1 + 1).toBe(2)
  })

  it('el entorno tiene acceso a DOM globals', () => {
    const div = document.createElement('div')
    div.textContent = 'Blume'
    expect(div.textContent).toBe('Blume')
  })
})
