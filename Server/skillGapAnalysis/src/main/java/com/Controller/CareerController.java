package com.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.Entity.Career;
import com.Repository.CareerRepository;

@Controller
@RequestMapping("/career")
public class CareerController {

    @Autowired
    private CareerRepository careerRepository;

    @GetMapping("/add")
    public String showAddCareerForm(Model model) {
        model.addAttribute("career", new Career());
        return "career_form";
    }

    @PostMapping("/save")
    public String saveCareer(@ModelAttribute Career career) {
        careerRepository.save(career);
        return "redirect:/career/add"; // Redirect back to form
    }
}

