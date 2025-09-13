const LaserBeam = ({ style }) => {
    return (
        <div
            className="h-1 bg-red-500 rounded-full shadow-[0_0_10px_red] z-[-10] hidden md:block"
            style={style}
        />
    );
};

export default LaserBeam;