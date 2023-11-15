import type { Address } from 'viem'

const bytecode =
  '0x608060405234801561001057600080fd5b5060d88061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063771602f714602d575b600080fd5b603c60383660046061565b604e565b60405190815260200160405180910390f35b6000605882846082565b90505b92915050565b60008060408385031215607357600080fd5b50508035926020909101359150565b80820180821115605b57634e487b7160e01b600052601160045260246000fdfea2646970667358221220772145df3e1d24fed9217caaa1e99100d6f57f052b0cc56505593e6155f2a5b764736f6c63430008150033'

const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'a',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'b',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function',
    name: 'add',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ]
  }
] as const

export const AddContract = {
  abi,
  bytecode,
  read: {
    add: (a, b, options: {
      contractAddress: Address
      gasLimit?: bigint
      caller?: Address
    }) =>
      ({
        functionName: 'add',
        abi,        
        args: [a, b],
        ...options
      } as const)
  },
  script: {
    add: (a, b) =>
      ({
        bytecode,
        abi,
        functionName: 'add',
        args: [a, b]
      } as const)
  }
} as const
