import { useCallback, useEffect, useState } from "react"
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

const useSocketHandlers = (socket, handlers) => {

    useEffect(() => {
        Object.entries(handlers).forEach(([event, handlers]) => {
            socket.on(event, handlers)
        })

        return () => {
            Object.entries(handlers).forEach(([event, handlers]) => {
                socket.off(event, handlers)
            })
        }
    }, [socket, handlers])
}

const useInfiniteScroll = (containerRef, totalPages, currentPage, setCurrentPage) => {

    const [isFetching, setIsFetching] = useState(false)

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current
            console.log(scrollTop , clientHeight , "77");
            if (scrollTop >= clientHeight && !isFetching && currentPage < totalPages) {
                console.log(79);
                setIsFetching(true)
            }
        }
    }, [containerRef, totalPages, currentPage, isFetching])
    

    useEffect(() => {
        if (isFetching) {
            setCurrentPage((prevPage) => prevPage + 1)
            setIsFetching(false)
        }
    }, [isFetching, setCurrentPage])


    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll, containerRef])

    return [currentPage]
}

export { useErrors, useAsyncMutationHooks, useSocketHandlers, useInfiniteScroll }