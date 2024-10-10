document.getElementById('tipForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const billAmount = document.getElementById('billAmount').value;
    const tipPercentage = document.getElementById('tipPercentage').value;

    const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            billAmount: billAmount,
            tipPercentage: tipPercentage
        })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById('tipAmount').textContent = `Tip Amount: $${data.calculation.tip_amount.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `Total Amount: $${data.calculation.total_amount.toFixed(2)}`;
    } else {
        alert('Error calculating tip.');
    }
});
