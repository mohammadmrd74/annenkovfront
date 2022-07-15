import useBreakpoints from "vue-next-breakpoints";

const breakpoints = useBreakpoints({
    mobile: 600, // max-width: 600px
    desktop: [601] // min-width: 601px
})

export default breakpoints;