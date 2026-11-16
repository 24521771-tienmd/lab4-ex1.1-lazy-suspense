import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const peopleCssSource = new URL('../src/pages/people/people.css', import.meta.url)

test('people-frame declares the minmax(280px, 1fr) 2fr master-detail grid', async () => {
  const css = await readFile(peopleCssSource, 'utf8')

  assert.match(
    css,
    /\.people-frame\s*\{[^}]*grid-template-columns:\s*minmax\(280px,\s*1fr\)\s+2fr\s*;/,
  )
})

test('people-frame collapses to one column at the 640px breakpoint', async () => {
  const css = await readFile(peopleCssSource, 'utf8')

  assert.match(
    css,
    /@media\s*\(max-width:\s*640px\)\s*\{\s*\.people-frame\s*\{[^}]*grid-template-columns:\s*1fr\s*;/,
  )
})
