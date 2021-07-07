interface _output {
    Holders : string,
    Price : Number
}

export const MillionsTokenQuery = async (): Promise<_output> => {
    const apiUrl = process.env.Endpoint;
    const init = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    }
    const response = await fetch(apiUrl, init);
    const responseBody:_output = await response.json()

    return responseBody
}
