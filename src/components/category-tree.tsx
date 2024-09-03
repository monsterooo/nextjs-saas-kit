"use client"

import Tree, { TreeNode } from "rc-tree"

import { ICategoryTree } from "@/types/dashboard"

import { Icons } from "./icons"

interface IProps {
  treeData: ICategoryTree[]
  onChange: (value: string) => void
  value: string
}

export function CategoryTree({ value, treeData, onChange }: IProps) {
  const loop = (data: ICategoryTree[]) => {
    return data?.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.id} title={item.name}>
            {loop(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.name} />
    })
  }

  const handleSelect = (selectedKeys) => {
    onChange(selectedKeys[0])
  }

  return (
    <Tree
      className="category-tree w-full"
      switcherIcon={(props) => {
        if (props.isLeaf) {
          return null
        }
        if (props.expanded) {
          return <Icons.chevronDown className="inline-block w-5 h-5" />
        }
        return <Icons.chevronRight className="inline-block w-5 h-5" />
      }}
      multiple={false}
      selectedKeys={[value]}
      autoExpandParent
      defaultExpandAll
      onSelect={handleSelect}
    >
      {loop(treeData)}
    </Tree>
  )
}
