const spendList = [{
   name: 'Tiền ăn trưa',
   amount: 35000,
   date: '2024-12-23'
}, {
  name: 'Tiền đổ xăng',
  amount: 70000,
  date: '2024-12-21'
}, {
  name: 'Tiền sửa xe',
  amount: 1000000,
  date: '2024-06-01'
}, {
  name: 'Tiền ăn sáng', 
  amount: 20000,
  date: '2024-08-03'
}];

renderSpendList();

document.querySelector('.js-add-spend-button').addEventListener('click', () => {
  addSpend();
});

const spendOn = new Map();
spendList.forEach((spendObject, index) => {
  spendOn.set(convertDate(spendObject.date), spendObject.amount);
});

const N = 1e6;
const M = new Array(N);

function convertDate(date) {
  const year = (date[0] - '0') * 1000 + (date[1] - '0') * 100 + (date[2] - '0') * 10 + (date[3] - '0');
  const month = (date[5] - '0') * 10 + (date[6] - '0');
  const day = (date[8] - '0') * 10 + (date[9] - '0');
  return year * 366 + month * 31 + day;
}

function amountSpentInInterval(start, end) {
  return M[convertDate(end)] - M[convertDate(start) - 1];
}

function computeM() {
  M.fill(0);
  M[0] = 0;
  for (let i = 1 ; i < N; i++) {
    M[i] += M[i - 1] + (spendOn.get(i) || 0);
  }
}

function renderSpendList() {
  let spendListHTML = '';

  spendList.forEach((spendObject, index) => {
    const { name, amount, date } = spendObject;
    const html = `
      <div>${name}</div>
      <div>${amount} VND</div>
      <div>${date}</div>
      <button class="js-delete-spend-button delete-spend-button">Delete</button>
    `;
    spendListHTML += html;
  });

  document.querySelector('.js-spend-list').innerHTML = spendListHTML;

  document.querySelectorAll('.js-delete-spend-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      spendList.splice(index, 1);
      renderSpendList();
    });
  });
}

function addSpend() {
  const nameInputElement = document.querySelector('.js-name-input');
  const name = nameInputElement.value;

  const amountInputElement = document.querySelector('.js-amount-input');
  const amount = Number(amountInputElement.value);
  console.log(amount);

  const dateInputElement = document.querySelector('.js-date-input');
  const date = dateInputElement.value;
  console.log(date);

  spendList.push({
    name,
    amount,
    date
  });



  nameInputElement.value = '';
  amountInputElement.value = '';
  dateInputElement.value = '';

  renderSpendList();
}

