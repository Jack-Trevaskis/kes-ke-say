import { useQuery } from "@tanstack/react-query";
import request from "superagent";

export default function useGroup() {
    return useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const res = await request.get('/api/v1/groups/1')
            if (res.ok) {
                // console.log('res.body:', res.body)
                return res.body
            }

            throw new Error(res.text);
        }
    })
}
