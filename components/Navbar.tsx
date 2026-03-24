'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

// Navbar component

interface NavbarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  return (
    <div className={styles.navContainer}>
      <motion.button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Expansion is handled in page.tsx */}
    </div>
  )
}
export default Navbar;
