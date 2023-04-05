import FlexWrapper from "@/components/FlexWrapper/FlexWrapper";
import Summary from "@/components/Summary/Summary";
import Accounts from '@/components/Accounts/Accounts';
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";

async function getBalances() {
  const res = await fetch("http://127.0.0.1:8080/balances");

  if(!res.ok) {
    throw new Error("Failed to fetch balances");
  }

  return res.json();
}

async function getTransactions() {
  const res = await fetch("http://127.0.0.1:8080/transactions");

  if(!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
}

export default async function Home() {
  const balances = await getBalances();
  const transactions = await getTransactions();

  return (
    <FlexWrapper>
      <Summary data={balances}/>
      <Accounts />
      <TransactionHistory data={transactions}/>
    </FlexWrapper>
  );
}
