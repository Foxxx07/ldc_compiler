const keywords = {
    'int-declaration': { r: /(int\s)/, s: 'int' },
    'double-declaration': { r: /(double\s)/, s: 'double' },
    'string-declaration': { r: /(String\s)/, s: 'String' },
    'char-declaration': { r: /(char\s)/, s: 'char' },
    'byte-declaration': { r: /(byte\s)/, s: 'byte' },
    'boolean-declaration': { r: /(boolean\s)/, s: 'boolean' },
    'float-declaration': { r: /(float\s)/, s: 'float' },
    'short-declaration': { r: /(short\s)/, s: 'short' },
    'long-declaration': { r: /(long\s)/, s: 'long' },
    'void-declaration': { r: /(void\s)/, s: 'void' },
    'object-declaration': { r: /(Object\s)/, s: 'Object' },

    'public-accessor': { r: /(public\s)/, s: 'public' },
    'private-accessor': { r: /(private\s)/, s: 'private' },
    'protected-accessor': { r: /(protected\s)/, s: 'protected' },

    'while-condition': { r: /(while)/, s: 'while' },
    'for-condition': { r: /(for)/, s: 'for' },
    'if-condition': { r: /(if)/, s: 'if' },
    'else-condition': { r: /(else)/, s: 'else' },

    'console-object': { r: /(System)/, s: 'System' },
    'static-element': { r: /(static\s)/, s: 'static' },
    'final-element': { r: /(final\s)/, s: 'final' },
    'main-element': { r: /(main)/, s: 'main' },
    'hashMap': { r: /(HashMap)/, s: 'HashMap' },
    'hashSet': { r: /(HashSet)/, s: 'HashSet' },
    'class': { r: /(class\s)/, s: 'class' }
};
module.exports = keywords;