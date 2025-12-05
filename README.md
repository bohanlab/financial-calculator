# Financial Calculator (财务计算器)

A web-based time value of money (TVM) calculator built with pure HTML, CSS, and JavaScript. This tool is designed to solve for any of the five core variables in financial analysis: Present Value (PV), Future Value (FV), Payment (PMT), Interest Rate (r), and Number of Periods (n).

## ✨ Features

* **Solve for Any Variable:** Easily compute for PV, FV, PMT, Interest Rate, or Number of Periods when the other four variables are known.
* **Payment Timing Selection:** Supports both **Annuity Due (Begining of Period)** and **Ordinary Annuity (End of Period)**.

## ⚙️ Installation and Usage

Since this is a client-side web application, no complex installation is required.

### Local Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/financial-calculator.git](https://github.com/your-username/financial-calculator.git)
    cd financial-calculator
    ```
2.  **Open the File:**
    * Locate and open the `financial-calculator.html` file in your preferred web browser (Chrome, Firefox, etc.).

### How to Use the Calculator

1.  **Enter Known Values:** Input the numerical values for the four variables you already know (e.g., PV, PMT, r, n).
2.  **Select Payment Timing:** Choose **End of Period (期末)** or **Beginning of Period (期初)**.
3.  **Solve:** Click the **Solve** button next to the variable you wish to calculate. The result will be displayed in the corresponding input field.

## 💡 Sign Convention (Cash Flow)

This calculator follows the standard financial convention for cash flows:

| Cash Flow Type | Description | Input Value |
| :--- | :--- | :--- |
| **Inflow** | Cash received (e.g., loan principal, investment returns) | **Positive Number** |
| **Outflow** | Cash paid (e.g., loan payments, investment expenditure) | **Negative Number** |

*Example: A deposit of $10,000 into a bank account would be entered as **-10000** (an outflow from your perspective).*

## 📖 The Underlying Formula

The calculator uses the fundamental Time Value of Money (TVM) equation, which balances the present and future values of all cash flows to zero:

$$
PV \cdot (1 + r)^n + PMT \cdot (1 + r \cdot type) \cdot \frac{(1 + r)^n - 1}{r} + FV = 0
$$

**Where:**

* $PV$: Present Value
* $FV$: Future Value
* $PMT$: Periodic Payment Amount
* $n$: Total Number of Periods
* $r$: Interest Rate per Period (e.g., Annual Rate / Number of Periods per Year)
* $type$: Payment Timing
    * $type = 0$: Ordinary Annuity (End of Period / 期末)
    * $type = 1$: Annuity Due (Beginning of Period / 期初)
