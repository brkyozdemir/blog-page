export const increment = () => {
    return {
        type: "INCREMENT"
    }
}

export const fetchData = () => {
    return (dispatch) => {
        return fetch('https://fenriscan.test/api/ui/dashboard', {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOGQ2OWYwM2M2YjgyMGQ5NzAwYmYzNmYxNTY3ZmJmYjdkZTUzMzRlNDE1ZjA3MzU3Y2M3NWM0NGJhYzgwOTJmMzk4OGYwNThmNjMwYWNhOWQiLCJpYXQiOjE1OTA1MjA5MDQsIm5iZiI6MTU5MDUyMDkwNCwiZXhwIjoxNjIyMDU2OTA0LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.TIy7MwjWTFmQ71gWswbYv49vdmY3rqw72BwMKGQEA57h0UgjGIHQVDyGEp-OW4dHvHRpPzeSCrvk9dRUciLeyYELonJL39I01qfXqCXq_L3-Ts6hlNia4kIk9m2HSGgL_UybAjYcJHx_J_xS5mMWWqw4LoL8olROcwD2bMt7l2LQa0SW4iIZctNHonWR5zJmIotdICO4sa6L0EcShzdVyMxqg01Tw73TEfLtdaZxBw34bcRYQ__vS-ZwXs-p1l6-MjyEDZ53nv3kAL-VZBfmVGVFwCTvrfyzBMi-YLMm6L0GOG70tBh7Kx2VRpIVWV2GAJPZGyj0e52AHuWDCOQP1aBAcDW7L8Jwxg_04Rz0Jc7_cNRtHzz0ybt_jV6b3A6w2qDQ9HZ547RxZ5ulhASAzGubCVvfVZpIE8aRoM0giLaXNQABI7F_PQxnbtJvwKMZ6WmF4PBveXbjalnORKXA_kx1YDKnVKE-LDdo6kFRtjjPgjjkFELdrvE2h7ezp-Ci4aF1bDX54GyQkxTyxvvMlW0wfAbEBWoEXlmghMfYI0I55RzHaSvE8N3WXASrPTTLsKpNJap4Jq0H-pDZqQbBIO4L4IYydjCKHN1WTLJVkcGF900Bf4qJOLxkknv7Cq4j3WZ8A7HEO8DZ_Fy_zNtS8NqjQptY1FuIo8b5q6PW2AI",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                dispatch(
                    {
                        type: "FetchData", payload: {
                            malicious: json.malicious,
                            submissions: json.submissions,
                            totalSubmissions: json.total.submissions,
                            totalActive: json.total.active,
                            totalCompleted: json.total.completed,
                            totalMalicious: json.total.malicious,
                            totalNonSpecific: json.total.nonSpecific,
                            totalPrivate: json.total.private,
                            totalPublic: json.total.public,
                            totalSuspicious: json.total.suspicious,
                            totalUsers: json.total.users
                        }
                    }
                )
            })
            .catch(err => dispatch({
                type: "ERROR", msg: "Unable to fetch data"
            }))
    }
}
