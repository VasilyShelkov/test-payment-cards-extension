export default {
  cardTypes: [
    { cardNum: "4242424242424242", description: "Visa" },
    { cardNum: "4000056655665556", description: "Visa (debit)" },
    { cardNum: "5555555555554444", description: "Mastercard" },
    { cardNum: "2223003122003222", description: "Mastercard (2-series)" },
    { cardNum: "5200828282828210", description: "Mastercard (debit)" },
    { cardNum: "5105105105105100", description: "Mastercard (prepaid)" },
    { cardNum: "378282246310005", description: "American Express" },
    { cardNum: "371449635398431", description: "American Express" },
    { cardNum: "6011111111111117", description: "Discover" },
    { cardNum: "6011000990139424", description: "Discover" },
    { cardNum: "30569309025904", description: "Diners Club" },
    { cardNum: "38520000023237", description: "Diners Club" },
    { cardNum: "3566002020360505", description: "JCB" },
    { cardNum: "6200000000000005", description: "UnionPay" }
  ],
  internationalCards: [
    { cardNum: "4000000760000002", description: "Brazil (BR)" },
    { cardNum: "4000001240000000", description: "Canada (CA)" },
    { cardNum: "4012888888881881", description: "Canada (CA)" },
    { cardNum: "4000004840000008", description: "Mexico (MX)" },
    { cardNum: "4000000400000008", description: "Austria (AT)" },
    { cardNum: "4000000560000004", description: "Belgium (BE)" },
    { cardNum: "4000002080000001", description: "Denmark (DK)" },
    { cardNum: "4000002460000001", description: "Finland (FI)" },
    { cardNum: "4000002500000003", description: "France (FR)" },
    { cardNum: "4000002760000016", description: "Germany (DE)" },
    { cardNum: "4000003720000005", description: "Ireland (IE)" },
    { cardNum: "4000003800000008", description: "Italy (IT)" },
    { cardNum: "4000004420000006", description: "Luxembourg (LU)" },
    { cardNum: "4000005280000002", description: "Netherlands (NL)" },
    { cardNum: "4000005780000007", description: "Norway (NO)" },
    { cardNum: "4000006200000007", description: "Portugal (PT)" },
    { cardNum: "4000006430000009", description: "Russian Federation (RU)" },
    { cardNum: "4000007240000007", description: "Spain (ES)" },
    { cardNum: "4000007520000008", description: "Sweden (SE)" },
    { cardNum: "4000007560000009", description: "Switzerland (CH)" },
    { cardNum: "4000008260000000", description: "United Kingdom (GB)" },
    { cardNum: "4000058260000005", description: "United Kingdom (GB)" },
    { cardNum: "4000000360000006", description: "Australia (AU)" },
    { cardNum: "4000001560000002", description: "China (CN)" },
    { cardNum: "4000003440000004", description: "Hong Kong (HK)" },
    { cardNum: "4000003920000003", description: "Japan (JP)" },
    { cardNum: "3530111333300000", description: "Japan (JP)" },
    { cardNum: "4000005540000008", description: "New Zealand (NZ)" },
    { cardNum: "4000007020000003", description: "Singapore (SG)" },
    { cardNum: "4000000000003063", description: "" },
    { cardNum: "4000000000003055", description: "" },
    { cardNum: "4242424242424242", description: "" },
    { cardNum: "378282246310005", description: "" }
  ],
  "3dsCards": [
    {
      cardNum: "4000000000003063",
      description:
        "3D Secure authentication must be completed for the payment to be successful.\n          By default, your Radar rules will request 3D Secure authentication for this card."
    },
    {
      cardNum: "4000000000003055",
      description:
        "3D Secure authentication may still be performed, but is not required.\n          By default, your Radar rules will not request 3D Secure authentication for this card."
    },
    {
      cardNum: "4242424242424242",
      description:
        "3D Secure is supported for this card, but this card is not enrolled in 3D Secure.\n          This means that if 3D Secure is requested by your Radar rules, the customer will not go through additional authentication.\n          By default, your Radar rules will not request 3D Secure authentication for this card."
    },
    {
      cardNum: "378282246310005",
      description:
        "3D Secure is not supported on this card and cannot be invoked.\n          The PaymentIntent will proceed without performing authentication."
    }
  ],
  disputes: [
    {
      cardNum: "4000000000000259",
      description:
        "With default account settings, charge succeeds, only to be disputed."
    },
    {
      cardNum: "4000000000001976",
      description:
        "With default account settings, charge succeeds, only to be disputed as an inquiry."
    }
  ],
  cardResponses: [
    {
      cardNum: "4000000000000077",
      description:
        "Charge succeeds and funds will be added directly to your available balance (bypassing your pending balance)."
    },
    {
      cardNum: "4000000000000093",
      description:
        "Charge succeeds and domestic pricing is used (other test cards use international pricing). This card is only significant in countries with split pricing."
    },
    {
      cardNum: "4000000000000010",
      description:
        "The address_line1_check and address_zip_check verifications fail. If your account is blocking payments that fail postal code validation, the charge is declined."
    },
    {
      cardNum: "4000000000000028",
      description:
        "Charge succeeds but the address_line1_check verification fails."
    },
    {
      cardNum: "4000000000000036",
      description:
        "The address_zip_check verification fails. If your account is blocking payments that fail postal code validation, the charge is declined."
    },
    {
      cardNum: "4000000000000044",
      description:
        "Charge succeeds but the address_zip_check and address_line1_check verifications are both unavailable."
    },
    {
      cardNum: "4000000000005126",
      description:
        "Charge succeeds but refunding a captured charge fails with a failure_reason of expired_or_canceled_card."
    },
    {
      cardNum: "4000000000000101",
      description:
        "If a CVC number is provided, the cvc_check fails. If your account is blocking payments that fail CVC code validation, the charge is declined."
    },
    {
      cardNum: "4000000000000341",
      description:
        "Attaching this card to a Customer object succeeds, but attempts to charge the customer fail."
    },
    {
      cardNum: "4000000000009235",
      description: "Results in a charge with a risk_level of elevated."
    },
    {
      cardNum: "4000000000004954",
      description: "Results in a charge with a risk_level of highest."
    },
    {
      cardNum: "4100000000000019",
      description:
        "Results in a charge with a risk_level of highest. The charge is blocked as it's considered fraudulent."
    },
    {
      cardNum: "4000000000000002",
      description: "Charge is declined with a card_declined code."
    },
    {
      cardNum: "4000000000009995",
      description:
        "Charge is declined with a card_declined code. The decline_code attribute is insufficient_funds."
    },
    {
      cardNum: "4000000000009987",
      description:
        "Charge is declined with a card_declined code. The decline_code attribute is lost_card."
    },
    {
      cardNum: "4000000000009979",
      description:
        "Charge is declined with a card_declined code. The decline_code attribute is stolen_card."
    },
    {
      cardNum: "4000000000000069",
      description: "Charge is declined with an expired_card code."
    },
    {
      cardNum: "4000000000000127",
      description: "Charge is declined with an incorrect_cvc code."
    },
    {
      cardNum: "4000000000000119",
      description: "Charge is declined with a processing_error code."
    },
    {
      cardNum: "4242424242424241",
      description:
        "Charge is declined with an incorrect_number code as the card number fails the Luhn check."
    }
  ]
};
