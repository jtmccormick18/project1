const validFiat = ['USD', 'EUR', 'GBP', 'JPY'];
const validCrypto = ['BTC', 'ETH', 'LTC'];
const dropdowns = [];
class Dropdown {
    constructor(select, options, defaultCode) {
        this.select = select;
        this.codeContainer = this.select.getElementsByClassName('select-value')[0];
        this.options = options;
        this.menu = document.createElement('div');
        this.menu.classList.add('option-menu', 'hidden');
        this.setMenu();
        this.select.appendChild(this.menu);
        this.optionDivs = this.select.getElementsByClassName('custom-option');
        setTimeout( () => {
            this.selectCode(defaultCode);
        }, 0);

        this.menu.addEventListener('click', (e) => {
            if (e.target.classList.contains('custom-option')) {
                this.selectCode(e.target.getAttribute('data-code'));
                setParams();
                updateChart();
            }
        });
        dropdowns.push(this);
    }
    selectCode(code) {
        this.codeContainer.innerHTML = code;
        updateOptions();
    }
    hideOption(optionCode) {
        for (var i = 0; i < this.optionDivs.length; i++) {
            if (optionCode === this.optionDivs[i].getAttribute('data-code')) {
                this.optionDivs[i].classList.add('hidden');
                break;
            }
        }
    }
    showAllOptions() {
        for (let i = 0; i < this.optionDivs.length; i++) {
            this.optionDivs[i].classList.remove('hidden');
        }
    }
    setMenu() {
        this.menu.innerHTML = '';
        let customOption;
        for (let i = 0; i < this.options.length; i++) {
            customOption = document.createElement('div');
            customOption.setAttribute('data-code', this.options[i]);
            customOption.classList.add('custom-option');
            customOption.innerHTML = this.options[i];
            this.menu.appendChild(customOption);
        }
        return this;
    }
    renderMenu() {
        this.menu.classList.remove('hidden');
        return this;
    }
}
function hideMenus(clickedDropdown) {
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i] !== clickedDropdown) {
            dropdowns[i].menu.classList.add('hidden');
        }
    }
}
function checkForDuplicates(drop1, drop2, switchCheck) {
    if (drop1.options.includes(drop2.codeContainer.innerHTML)) {
        drop1.hideOption(drop2.codeContainer.innerHTML)
    } else {
        drop1.showAllOptions();
    }
    if (!switchCheck) {
        checkForDuplicates(drop2, drop1, true);
    }
}
function updateOptions() {
    checkForDuplicates(chartQuote, chartBase);
    checkForDuplicates(exchangeQuote, exchangeBase);
}

const chartBase = new Dropdown(
    document.querySelector('.chart-base .custom-select'),
    validCrypto,
    'BTC'
);
const chartQuote = new Dropdown(
    document.querySelector('.chart-quote .custom-select'),
    validFiat,
    'USD'
);
const chartPeriod = new Dropdown(
    document.querySelector('.chart-period .custom-select'),
    ['Daily', 'Monthly', 'All Time'],
    'Daily'
)
const exchangeBase = new Dropdown(
    document.querySelector('.exchange-base .custom-select'),
    validCrypto,
    'BTC'
);
const exchangeQuote = new Dropdown(
    document.querySelector('.exchange-quote .custom-select'),
    validFiat.concat(validCrypto),
    'USD'
);
console.log(dropdowns);

document.addEventListener('click', function(e) {
    e.preventDefault();
    let targetSelect;
    if (e.target.classList.contains('select-value')) {
        targetSelect = e.target.parentNode;
    } else {
        targetSelect = e.target;
    }
    let clickedDropdown;
    for (let i = 0; i < dropdowns.length; i++) {
        if (targetSelect === dropdowns[i].select) {
            clickedDropdown = dropdowns[i].renderMenu();
            break;
        }
    }
    hideMenus(clickedDropdown);
})