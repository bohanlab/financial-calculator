function calculateFinancialValue(presentValue, futureValue, interestRate, numberOfPeriods, payment, flag, type) {
    const tolerance = 1e-7; // 允许的误差
    const maxIterations = 100; // 最大迭代次数
    if (flag === 0) {
        // PV
        if (interestRate === 0) {
            return -futureValue + payment * numberOfPeriods;
        }
        return -payment * (1 - Math.pow(1 + interestRate, -numberOfPeriods)) / interestRate * (1 + interestRate * type) - futureValue / Math.pow(1 + interestRate, numberOfPeriods);
    } else if (flag === 1) {
        // FV
        if (interestRate === 0) {
            return -presentValue + payment * numberOfPeriods;
        }
        return -presentValue * Math.pow(1 + interestRate, numberOfPeriods) - payment * ((Math.pow(1 + interestRate, numberOfPeriods) - 1) / interestRate) * (1 + interestRate * type);
    } else if (flag === 2) {
        // 使用Newton-Raphson法计算利率
        let rate = 0.1; // 初始值
        let iteration = 0;

        while (iteration < maxIterations) {
            // 计算 f(rate)
            const f = presentValue * Math.pow(1 + rate, numberOfPeriods) +
                      payment * (1 + rate * type) * (Math.pow(1 + rate, numberOfPeriods) - 1) / rate +
                      futureValue;

            // 计算 f'(rate)
            const fPrime = presentValue * numberOfPeriods * Math.pow(1 + rate, numberOfPeriods - 1) +
                           payment * (1 + rate * type) * (
                               (numberOfPeriods * Math.pow(1 + rate, numberOfPeriods - 1) / rate) -
                               ((Math.pow(1 + rate, numberOfPeriods) - 1) / (rate * rate))
                           );

            // 更新 rate
            const newRate = rate - f / fPrime;

            // 检查是否收敛
            if (Math.abs(newRate - rate) < tolerance) {
                return newRate;
            }

            rate = newRate;
            iteration++;
        }

        // 如果超过最大迭代次数，抛出错误
        throw new Error("Interest rate calculation did not converge");
    } else if (flag === 3) {
        // numberOfPeriods
        if (interestRate === 0) {
            return (-presentValue - futureValue) / payment;
        }
        return Math.log((-futureValue + payment * (1 + interestRate * type) / interestRate) / (presentValue + payment * (1 + interestRate * type) / interestRate)) / Math.log(1 + interestRate);
    } else if (flag === 4) {
        // payment
        if (interestRate === 0) {
            return (-presentValue - futureValue) / numberOfPeriods;
        }
        return -(presentValue * (Math.pow(1 + interestRate, numberOfPeriods)) + futureValue) / ((1 + interestRate * type) * ((Math.pow(1 + interestRate, numberOfPeriods)) - 1) / interestRate);
    } else {
        throw new Error("Invalid input parameters.");
    }
}

// 添加 solve 按钮的事件监听器
document.querySelectorAll('.solve-button').forEach(button => {
    button.addEventListener('click', function() {
        const inputField = this.previousElementSibling;
        const inputId = inputField.id;
        const inputValue = parseFloat(inputField.value);

        // 获取其他输入框的值
        const presentValue = parseFloat(document.getElementById('present-value').value);
        const futureValue = parseFloat(document.getElementById('future-value').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
        const numberOfPeriods = parseFloat(document.getElementById('number-of-periods').value);
        const payment = parseFloat(document.getElementById('payment').value);

        // 获取支付时间类型 (期初 or 期末)
        const type = parseInt(document.querySelector('input[name="payment-timing"]:checked').value);

        let result;
        switch (inputId) {
            case 'present-value':
                if (!isNaN(futureValue) && !isNaN(interestRate) && !isNaN(numberOfPeriods) && !isNaN(payment)) {
                    result = calculateFinancialValue(presentValue, futureValue, interestRate, numberOfPeriods, payment, 0, type);
                }
                break;
            case 'future-value':
                if (!isNaN(presentValue) && !isNaN(interestRate) && !isNaN(numberOfPeriods) && !isNaN(payment)) {
                    result = calculateFinancialValue(presentValue, futureValue, interestRate, numberOfPeriods, payment, 1, type);
                }
                break;
            case 'interest-rate':
                if (!isNaN(presentValue) && !isNaN(futureValue) && !isNaN(numberOfPeriods) && !isNaN(payment)) {
                    result = calculateFinancialValue(presentValue, futureValue, interestRate, numberOfPeriods, payment, 2, type) * 100;
                }
                break;
            case 'number-of-periods':
                if (!isNaN(presentValue) && !isNaN(futureValue) && !isNaN(interestRate) && !isNaN(payment)) {
                    result = calculateFinancialValue(presentValue, futureValue, interestRate, numberOfPeriods, payment, 3, type);
                }
                break;
            case 'payment':
                if (!isNaN(presentValue) && !isNaN(futureValue) && !isNaN(interestRate) && !isNaN(numberOfPeriods)) {
                    result = calculateFinancialValue(presentValue, futureValue, interestRate, numberOfPeriods, payment, 4, type);
                }
                break;
            default:
                result = 'Invalid input field.';
        }

        // 将结果显示在对应的输入框中
        if (result !== undefined) {
            inputField.value = result.toFixed(2);
        }
    });
});

// 输入验证函数
function validateInput(input) {
    const pattern = /^-?[0-9]+(\.[0-9]+)?$/; // 允许负数
    if (!pattern.test(input.value)) {
        input.setCustomValidity('Please enter a valid number.');
    } else {
        input.setCustomValidity('');
    }
}

// 在每个输入框上添加验证监听器
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('invalid', function() {
        validateInput(this);
    });
});

