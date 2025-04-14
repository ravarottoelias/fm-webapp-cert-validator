export const getVideoDevices = async () => {
  try {
    const devicesList = await navigator.mediaDevices.enumerateDevices()
    if (devicesList) {
      return devicesList.filter((device) => device.kind === 'videoinput')
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export const thereIsAnyVideoDevice = async () => {
  let devices = await getVideoDevices()
  return devices.length > 0
}
