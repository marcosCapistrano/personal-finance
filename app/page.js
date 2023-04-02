import FlexWrapper from "@/components/FlexWrapper/FlexWrapper";
import Summary from "@/components/Summary/Summary";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";

export default async function Home() {
  return (
    <FlexWrapper>
      <Summary />
      <TransactionHistory />
    </FlexWrapper>
  );
}
