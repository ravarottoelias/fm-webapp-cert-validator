import axios from 'axios'

const API_URL = import.meta.env.VITE_API_MS_CERT_VALIDATION

export const getValidateCertificate = async (data) => {
  console.info('Calling getValidateCertificate ...')
  console.info(data)
  const body = {
    qrCode: data.qrCode,
    qrVersion: data.qrVersion,
    typeValidation: 'QR',
  }

  try {
    const response = await axios.post(API_URL + '/api/v1/certificates/validate', body)
    return response.data.response
  } catch (error) {
    if (error.response?.status == 500) {
      console.error('Error trying validate QR: ' + data.qrCode)
      console.error(error)
      throw error
    } else {
      return null
    }
  }
}
