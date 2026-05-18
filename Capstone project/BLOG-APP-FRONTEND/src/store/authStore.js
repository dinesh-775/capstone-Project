import { create } from "zustand"
import axios from "axios";
import { useLoaderData } from "react-router";
export const useAuth = create((set) => ({
    currentUser: null,
    loading: false,
    isAuthenticated: false,
    error: null,

    // Login
    login: async (userCredWithRole) => {
        const { role, ...userCredObj } = userCredWithRole;
        try {
            set({ loading: true, error: null });
            let res = await axios.post("http://localhost:4000/common-api/login", userCredObj, { withCredentials: true });
            console.log("res is :", res);

            set({
                loading: false,
                error: null,
                isAuthenticated: true,
                currentUser: res.data.payload
            })
        }
        catch (err) {
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                error: err
            })
        }
    },

    // Logout
    logout: async () => {
        try {
            // set loading true
            set({ loading: true, error: null })
            // make logout api req
            let res = await axios.get("http://localhost:4000/common-api/logout", { withCredentials: true })
            //update state
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null
            })
        }
        catch (err) {
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null

            })
        }
    }

}))

export const useArticles = create((set) => ({
    // Articles

    allArticles: [],
    readArticles: async () => {
        try {
            // start loading
            set({
                loading: true,
                error: null
            });

            // API request
            const res = await axios.get(
                "http://localhost:4000/author-api/articles",
                { withCredentials: true }
            );

            // save response
            set({
                allArticles: res.data.payload,
                loading: false,
                error: null
            });

        } catch (err) {
            set({
                loading: false,
                allArticles: [],
                error: err.message
            });
        }
    }
}))
