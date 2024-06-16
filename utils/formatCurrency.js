export default function formatCurrency(value) {
  return (value > -0.001 && value < 0.001) ? 'R$ 0,00' : new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value);
}
