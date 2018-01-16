export const authCodeFlow = (next) => {
 return `https://v2.steemconnect.com/oauth2/authorize?client_id=utopian.app&response_type=code&redirect_uri=${process.env.STEEMCONNECT_REDIRECT_URL}&scope=offline,vote,comment,comment_delete,comment_options,custom_json,claim_reward_balance&state=${next}`;
};

