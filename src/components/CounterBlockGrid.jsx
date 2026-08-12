export default function CounterBlockGrid({ children }) {
    return (
        <div className='grid grid-cols-[repeat(4,150px)] mb-3'>
            {children}
        </div>
    )
}