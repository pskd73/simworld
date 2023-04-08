export function assertEq(left: any, right: any) {
  assert(left === right, `${left} does not equal to ${right}`)
}

export function assert(pred: boolean, message?: string) {
  if (!pred) {
    let errorMsg = 'Assertion failed. '
    if (message) {
      errorMsg += message
    }
    throw new Error(errorMsg)
  }
}