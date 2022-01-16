const usePunksUtils = () => {
  const shortAccount = (account) => `${account.slice(0, 4)} ... ${account.slice(account.length - 4)}`;

  return {
    shortAccount
  }
}

export default usePunksUtils;