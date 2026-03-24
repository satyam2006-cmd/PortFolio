'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

const menuItems = ['Home', 'Projects', 'Timeline', 'Contact']

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

      {/* The menu expansion is now handled in page.tsx for layout positioning if needed, 
          but keeping the internal list here for simplicity unless we want it separate. 
          Actually, the user wants the WHOLE grid to shrink, so the menu should probably 
          be ABOVE the shrinking content. */}
    </div>
  )
}
export default Navbar;
