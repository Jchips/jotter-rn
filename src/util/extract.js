/**
 * Recursive function to extract text from list item
 * @param {list_item} node - list item node
 * @returns {String} - All the text content of nodes/inner nodes joined together
 */
const extractText = (node) => {
  if (!node) return '';
  if (node.content) return node.content;
  if (node.children && node.children.length > 0) {
    return node.children.map(extractText).join('');
  }
  return '';
};

export { extractText };