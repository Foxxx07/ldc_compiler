const keywords = {
    'string-declaraction': { r: /(String\s)/, s: 'String' },
    'char-declaraction': { r: /(char\s)/, s: 'char' },
    'int-declaraction': { r: /(int\s)/, s: 'int' },
    'double-declaraction': { r: /(double\s)/, s: 'double' },
    'byte-declaraction': { r: /(byte\s)/, s: 'byte' },
    'boolean-declaraction': { r: /(boolean\s)/, s: 'boolean' },
    'float-declaraction': { r: /(float\s)/, s: 'float' },
    'short-declaraction': { r: /(short\s)/, s: 'short' },
    'long-declaraction': { r: /(long\s)/, s: 'long' },
    'console-object': { r: /(System)/, s: 'System' },
    'public-accessor': { r: /(public\s)/, s: 'public' },
    'private-accessor': { r: /(private\s)/, s: 'private' },
    'protected-accessor': { r: /(protected\s)/, s: 'protected' },
    'static-element': { r: /(static\s)/, s: 'static' },
    'while-condition': { r: /(while)/, s: 'while' },
    'if-condition': { r: /(if)/, s: 'if' },
    'else-condition': { r: /(else)/, s: 'else' },
    'for-condition': { r: /(for)/, s: 'for' },
    'HashMap': { r: /(HashMap)/, s: 'HashMap' },
    'HashSet': { r: /(HashSet)/, s: 'HashSet' },
    'object-declaration': { r: /(Object)/, s: 'Object' },
    'class': { r: /(class\s)/, s: 'class' }

};

module.exports = keywords;