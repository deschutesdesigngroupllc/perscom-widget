'use server'

export async function submitForm(previousState, formData) {
    console.log(formData)

    // const rawFormData = {
    //     customerId: formData.get('test'),
    // }

    //console.log(rawFormData)

    // return {
    //     error: true,
    //     message: 'There was an error!'
    // }

    return {
        success: true,
        message: 'Your form has been successfully submitted.'
    }
}