const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions-list');
const accountBalance = document.getElementById('account-balance');

transactionForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const dateInput = document.getElementById('date');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');

  const date = dateInput.value;
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (!date || !description || isNaN(amount)) {
    alert('Please fill in all fields with valid values.');
    return;
  }

  const transactionItem = createTransactionItem(date, description, amount);
  transactionsList.appendChild(transactionItem);

  updateAccountBalance(amount);
  resetFormFields();
});

function createTransactionItem(date, description, amount) {
  const transactionItem = document.createElement('li');
  transactionItem.innerHTML = `
    <span class="date">${date}</span>
    <span class="description">${description}</span>
    <span class="amount">${formatAmount(amount)}</span>
  `;
  return transactionItem;
}

function updateAccountBalance(amount) {
  const currentBalance = parseFloat(accountBalance.textContent.replace(/[^0-9.-]+/g, ''));
  const newBalance = currentBalance + amount;
  accountBalance.textContent = formatAmount(newBalance);
}

function formatAmount(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function resetFormFields() {
  transactionForm.reset();
}
