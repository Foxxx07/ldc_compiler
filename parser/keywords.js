const keywords = {
  'string-declaraction': { r: /(String\s)/, s: 'String' },
  'char-declaraction': { r: /(char\s)/, s: 'char' },
  'int-declaraction': { r: /(int\s)/, s: 'int' },
  'double-declaraction': { r: /(double\s)/, s: 'double' },
  'byte-declaraction': { r: /(byte\s)/, s: 'byte' },
  'boolean-declaraction': { r: /(boolean\s)/, s: 'boolean' },
  'float-declaraction': { r: /(float\s)/, s: 'float' },
  'console-object': { r: /(System)/, s: 'System' }
};


module.exports = keywords;