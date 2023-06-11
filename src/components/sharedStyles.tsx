const visuallyHiddenStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: -'1px',
  padding: '0',
  overflow: 'hidden',
  border: '0',
  clip: 'rect(0 0 0 0)',
} as const;

export default visuallyHiddenStyles;