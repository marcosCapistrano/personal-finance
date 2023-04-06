CREATE TYPE transaction_type AS ENUM ('INCOME', 'OUTGOING');
CREATE TYPE account_type AS ENUM ('CREDIT', 'DEBIT');

CREATE TABLE institutions (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	name varchar(25) NOT NULL
);

INSERT INTO institutions(name) VALUES('Nubank');

CREATE TABLE accounts (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	type account_type NOT NULL,
	name varchar(25) NOT NULL,
	institution_id uuid REFERENCES institutions
);

INSERT INTO accounts(type, name, institution_id) values('CREDIT', 'Crédito', '25633c40-2027-4a69-ba31-a4ea4b4424cf');

CREATE TABLE balances (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	date date NOT NULL,
	value numeric NOT NULL,
	account_id uuid REFERENCES accounts
);

ALTER TABLE balances ADD CONSTRAINT balances_unique_account_id_date UNIQUE (account_id, date);

INSERT INTO balances(date, value, account_id) values('2023/04/03', -1119.13, '30555c20-3b6b-4bcc-8803-17fa713a5746');

CREATE TABLE transactions(
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	date date NOT NULL,
	type transaction_type NOT NULL,
	value numeric NOT NULL,
	description varchar(50) NOT NULL,
	account_id uuid REFERENCES accounts
);

INSERT INTO transactions(date, type, value, description, account_id) VALUES('2023/04/03', 'OUTGOING', -199.60, '1/6 Lello Abril', '30555c20-3b6b-4bcc-8803-17fa713a5746');  

CREATE OR REPLACE FUNCTION update_balances()
RETURNS TRIGGER AS $$
DECLARE
    transaction_account_id uuid;
    transaction_date date;
    transaction_value numeric;
    transaction_type transaction_type;
    previous_balance numeric;
BEGIN
    IF (TG_OP = 'DELETE') THEN
        transaction_account_id := OLD.account_id;
        transaction_date := OLD.date;
        transaction_value := OLD.value;
        transaction_type := OLD.type;
    ELSE
        transaction_account_id := NEW.account_id;
        transaction_date := NEW.date;
        transaction_value := NEW.value;
        transaction_type := NEW.type;
    END IF;

    -- Get the previous balance before the transaction date
    SELECT value INTO previous_balance
    FROM balances
    WHERE account_id = transaction_account_id AND date < transaction_date
    ORDER BY date DESC
    LIMIT 1;

    -- If there is no previous balance, assume it to be zero
    IF previous_balance IS NULL THEN
        previous_balance := 0;
    END IF;

RAISE NOTICE 'transaction value %', transaction_value;
RAISE NOTICE 'transaction date %', transaction_date;
RAISE NOTICE 'transaction type %', transaction_type;

    IF transaction_type = 'INCOME' THEN
	  -- If a balance for that date already exists, update it
        IF EXISTS (SELECT FROM balances b WHERE b.account_id = transaction_account_id AND b.date = transaction_date) THEN
		IF TG_OP = 'DELETE' THEN
			UPDATE balances b SET value = b.value - transaction_value
            	WHERE b.date >= transaction_date AND b.account_id = transaction_account_id;
		ELSE
			UPDATE balances b SET value = b.value + transaction_value
            	WHERE b.date >= transaction_date AND b.account_id = transaction_account_id;
		END IF;
	  ELSE
		IF TG_OP != 'DELETE' THEN
			INSERT INTO balances (date, value, account_id)
            	VALUES (transaction_date, transaction_value+previous_balance, transaction_account_id);
		END IF;

		UPDATE balances b SET value = b.value + transaction_value
        	WHERE b.account_id = transaction_account_id AND b.date > transaction_date;
	  END IF;
    ELSE
	IF EXISTS (SELECT FROM balances b WHERE b.account_id = transaction_account_id AND b.date = transaction_date) THEN
		IF TG_OP = 'DELETE' THEN
			RAISE NOTICE 'myplpgsqlval is currently %', transaction_value;
			UPDATE balances b SET value = b.value + transaction_value
            	WHERE b.date >= transaction_date AND b.account_id = transaction_account_id;
		ELSE
			UPDATE balances b SET value = b.value - transaction_value
            	WHERE b.date >= transaction_date AND b.account_id = transaction_account_id;
		END IF;
	  ELSE
		IF TG_OP != 'DELETE' THEN
			INSERT INTO balances (date, value, account_id)
            	VALUES (transaction_date, previous_balance-transaction_value, transaction_account_id);
		END IF;
	
		UPDATE balances b SET value = b.value - transaction_value
        	WHERE b.account_id = transaction_account_id AND b.date > transaction_date;
	  END IF;
	END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
