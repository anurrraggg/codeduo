const LaserBeam = ({ style }) => {
    return (
        <div
            className="h-1 rounded-full shadow-[0_0_10px_red] z-[-20] hidden lg:block bg-gradient-to-r from-red-50 to-red-500"
            style={style}
        />
    );
};

export default LaserBeam;