import { IncomingMessageType } from '../messages'
import { AccountAddressResponse, requestType } from '../methods'
import { randomUUID } from 'node:crypto'

const TestHelper = () => {
  const createAddresses = (numberOfAddresses: number) =>
    new Array(numberOfAddresses).fill(null).map((_, index) => ({
      address: `rdx${Buffer.from(randomUUID()).toString('hex').slice(0, 32)}`,
      label: `address-${index}`,
    }))
  const createAccountAddressResponse = (
    numberOfAddresses: number
  ): AccountAddressResponse => ({
    requestType: requestType.accountAddresses,
    addresses: createAddresses(numberOfAddresses),
  })

  const createRequestReponse = (
    requestId: string,
    input: any
  ): IncomingMessageType => ({
    requestId,
    method: 'request',
    payload: input,
  })
  return {
    createAccountAddressResponse,
    createRequestReponse,
  }
}

export const testHelper = TestHelper()
