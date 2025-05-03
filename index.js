
document.getElementById('age-form').addEventListener('submit', function(event) {
    // Prevent the default form submission to avoid page refresh
    event.preventDefault();

    // Clear any previous error and result messages to start fresh
    document.getElementById('birth-date-error').textContent = '';
    document.getElementById('age-result').textContent = '';

    // Get the birth date input value in YYYY-MM-DD format
    const birthDateInput = document.getElementById('birth-date').value;

    // Check if the input is empty
    if (!birthDateInput) {
        document.getElementById('birth-date-error').textContent = 'Please enter your birth date';
        return;
    }

    // Split the YYYY-MM-DD string into year, month, and day components
    const [yearStr, monthStr, dayStr] = birthDateInput.split('-');

    // Convert the string components to numbers
    const birthYear = parseInt(yearStr, 10);
    const birthMonth = parseInt(monthStr, 10);
    const birthDay = parseInt(dayStr, 10);

    // Create a Date object for the birth date (month is 0-based in JavaScript Date)
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    // Validate that the date is valid by checking if it’s a real date and matches the input
    if (isNaN(birthDate.getTime()) || birthDate.getFullYear() !== birthYear || birthDate.getMonth() !== birthMonth - 1 || birthDate.getDate() !== birthDay) {
        document.getElementById('birth-date-error').textContent = 'Please enter a valid date';
        return;
    }

    // Get the current date
    const today = new Date();

    // Validate that the birth date is not in the future
    if (birthDate > today) {
        document.getElementById('birth-date-error').textContent = 'Birth date cannot be in the future';
        return;
    }

    // Extract current year, month, and day (month is 1-based for consistency)
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Calculate age in years, months, and days
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    // Adjust for negative days by borrowing from months
    if (days < 0) {
        months -= 1; // Borrow 1 month
        // Get the number of days in the previous month for accurate day calculation
        const prevMonth = new Date(birthYear, birthMonth - 1, 0);
        days += prevMonth.getDate(); // Add days in previous month (handles leap years)
    }

    // Adjust for negative months by borrowing from years
    if (months < 0) {
        years -= 1; // Borrow 1 year
        months += 12; // Add 12 months
    }

    // Handle special case: birthday is today (exact match)
    if (months === 0 && days === 0) {
        document.getElementById('age-result').textContent = 'Happy Birthday! You were born today!';
        return;
    }

    // Handle special case: age is less than 1 year
    if (years === 0) {
        const monthText = months === 1 ? 'month' : 'months';
        const dayText = days === 1 ? 'day' : 'days';
        document.getElementById('age-result').textContent = `You are ${months} ${monthText} and ${days} ${dayText} old`;
        return;
    }

    // Determine singular/plural forms for output
    const yearText = years === 1 ? 'year' : 'years';
    const monthText = months === 1 ? 'month' : 'months';
    const dayText = days === 1 ? 'day' : 'days';

    // Display the formatted age result
    document.getElementById('age-result').textContent = `You are ${years} ${yearText}, ${months} ${monthText}, and ${days} ${dayText} old`;
});