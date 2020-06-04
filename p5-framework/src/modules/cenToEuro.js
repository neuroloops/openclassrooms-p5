export default function centToEuro(price) {
  const cent = price.slice(-2);
  const euro = price.slice(0, -2);
  return `${euro},${cent}€`;
}
