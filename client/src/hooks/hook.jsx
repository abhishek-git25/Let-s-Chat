import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) {
                    fallback()
                } else {
                    toast.error(error.data.message || "Something went wrong")
                }
            }
        })
    }, [errors])
}

const useAsyncMutationHooks = (mutationHook) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const [mutate] = mutationHook()

    const executeMutation = async (toastMessage, ...args) => {
        setLoading(true)
        const toastId = toast.loading(toastMessage || "Updating")
        try {
            const res = await mutate(...args)
            if (res.data) {
                toast.success(res.data.message || "Updated data successfully", {
                    id: toastId
                })
                setData(res.data)
            } else {
                toast.error(res.error.data.message || "Something went wrong", {
                    id: toastId
                })
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                id: toastId
            })
        }

        finally {
            setLoading(false)
        }
    }

    return [executeMutation, loading, data]
}

export { useErrors, useAsyncMutationHooks }