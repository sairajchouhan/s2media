import React, { useState } from 'react'

export interface AutoGrowTextAreaProps {
  initialFocusRef: React.LegacyRef<HTMLTextAreaElement> | undefined
}

export const AutoGrowTextArea = ({ initialFocusRef }: AutoGrowTextAreaProps) => {
  const [state, setState] = useState({
    value: '',
    rows: 1,
    minRows: 1,
    maxRows: 100,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 28
    const { minRows, maxRows } = state

    const previousRows = e.target.rows
    e.target.rows = minRows // reset number of rows in textarea

    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
      e.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }

    setState((state) => ({
      ...state,
      value: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    }))
  }

  return (
    <textarea
      rows={state.rows}
      value={state.value}
      placeholder="Enter Caption..."
      className="block w-full p-0 pt-1 mt-0.5 overflow-hidden text-lg border-none focus:outline-none focus:ring-0"
      style={{ resize: 'none' }}
      onChange={(e) => handleChange(e)}
      ref={initialFocusRef}
    ></textarea>
  )
}
