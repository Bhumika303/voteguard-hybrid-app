import algosdk from 'algosdk';

const algodToken = 'a'.repeat(64);
const algodServer = 'http://localhost';
const algodPort = 4001;

const client = new algosdk.Algodv2(
  algodToken,
  algodServer,
  algodPort
);

export async function recordTransaction(noteText: string) {
  try {
    const account = algosdk.generateAccount();

    const params = await client.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: account.addr,
      receiver: account.addr,
      amount: 0,
      note: new TextEncoder().encode(noteText),
      suggestedParams: params
    });

    return {
      success: true,
      txId: txn.txID()
    };
  } catch (error) {
    return {
      success: false,
      message: 'LocalNet not running yet'
    };
  }
}