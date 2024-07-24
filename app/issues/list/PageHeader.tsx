import NavLink from "@/app/components/navbar/NavLink"

const PageHeader = () => {
  return (
    <div className="flex justify-between">
      <div>filters</div>
      <NavLink href="/issues/new" label="New Issue" variant="default"/>
    </div>
  )
}

export default PageHeader
